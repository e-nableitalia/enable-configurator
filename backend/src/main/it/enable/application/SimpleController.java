package it.enable.application;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.onshape.api.Onshape;
import com.onshape.api.exceptions.OnshapeException;
import com.onshape.api.responses.DocumentsCopyWorkspaceResponse;
import com.onshape.api.responses.DocumentsGetDocumentResponse;
import com.onshape.api.responses.DocumentsGetDocumentResponseDefaultWorkspace;
import com.onshape.api.types.OnshapeDocument;

@RestController
@RequestMapping("/customizer")
@CrossOrigin
public class SimpleController {
	private static Onshape client = new Onshape();

	private static final SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

	private static final Logger logger = (Logger) LogManager.getLogger(SimpleController.class);
	
	@Autowired
	private ResourceLoader resourceLoader;
	
	@PostMapping(value ="/bikeadapter",consumes = { "application/json"}, produces = { "application/json"})
	public ResponseEntity<?> findByCf(@RequestBody  BikeAdapterConfig config) {

		logger.info("Processing request, params = " + config.toString());
		try {
			String accessKey = System.getenv("ONSHAPE_API_ACCESSKEY");
			String secretKey = System.getenv("ONSHAPE_API_SECRETKEY");

			String documentUrl = System.getenv("ONSHAPE_DOCUMENT_URL");; // "https://cad.onshape.com/documents/5b587ad656e9d002f8e6bad6/w/de2c6c2802ab923db649ef32/e/ab629266e0f6758e30a87845";

			Timestamp timestamp = new Timestamp(System.currentTimeMillis());

			client.setAPICredentials(accessKey, secretKey);

			// create a copy
			OnshapeDocument bikeAdapter = new OnshapeDocument(documentUrl);
			String newName = "bikeAdapterWork_" + sdf2.format(timestamp);
			logger.info("Creating a document copy with name:" + newName);

			DocumentsCopyWorkspaceResponse copyWorkspaceResponse = client.documents().copyWorkspace().newName(newName).isPublic(true).call(bikeAdapter);

			String newDocID = copyWorkspaceResponse.getNewDocumentId();

			DocumentsGetDocumentResponse d = client.documents().getDocument().call(newDocID);

			DocumentsGetDocumentResponseDefaultWorkspace w = d.getDefaultWorkspace();
			String newWorkspaceId = w.getId();

			logger.info("Initializing customizer");
			BikeAdapterCustomizer customizer = new BikeAdapterCustomizer(client, newDocID, newWorkspaceId);
			logger.info("Loading params");
			customizer.load();
			logger.info("Setting params");
			customizer.setParam("A_lng_unaff", "lengthValue", "expression", config.arm + " mm");
			customizer.setParam("B_lng_affect", "lengthValue", "expression", config.affectedarm + " mm");
			customizer.setParam("F_lng_affect_inner_elbow", "lengthValue", "expression", config.affectedarminner + " mm");
			customizer.setParam("C_tip_circ", "lengthValue", "expression", config.cone + " mm");
			customizer.setParam("D_root_circ", "lengthValue", "expression", config.coneb + " mm");
			customizer.setParam("E_handlebar_dia", "lengthValue", "expression", config.handle + " mm");

			logger.info("STL Export");
			String exportedFile = customizer.export();        

			logger.info("Generated STL Document: " + exportedFile);
			
			logger.info("Deleting temp document");
			client.documents().deleteDocument().call(newDocID);

			String contentType ="model/stl";

			Resource resource = resourceLoader.getResource("file://" + exportedFile);
	
			String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

			logger.info("Returning back document to user");
			return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).header(HttpHeaders.CONTENT_DISPOSITION, headerValue).body(resource);
		} catch (OnshapeException exception) {
			logger.error("Error: " + exception.getMessage(),exception);
			return ResponseEntity.internalServerError().build();
		}
	}
}
