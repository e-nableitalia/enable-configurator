package it.enable.application;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.LinkedHashMap;

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

import it.enable.application.dto.GenerateSTL;
import net.minidev.json.JSONObject;

@RestController
@RequestMapping("/customizer")
@CrossOrigin
public class SimpleController {
	private static Onshape client = new Onshape();

	private static final SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");

	private static final Logger logger = (Logger) LogManager.getLogger(SimpleController.class);
	
	@Autowired
	private ResourceLoader resourceLoader;
	
	@PostMapping(value ="/generate",consumes = { "application/json"}, produces = { "application/json"})
	public ResponseEntity<?> findByCf(@RequestBody  GenerateSTL request) {

		logger.info("Processing request, params = " + request.toString());
		try {
			String accessKey = System.getenv("ONSHAPE_API_ACCESSKEY");
			String secretKey = System.getenv("ONSHAPE_API_SECRETKEY");
			
			// validate params
			if ((request.getEmail() == null) || (request.getDevice() == null) || (request.getDeviceUrl() == null) || (request.getParameters() == null)) {
				logger.error("Invalid request, some of the parameters is not valid");
				return ResponseEntity.badRequest().body("Invalid request, some of the parameters is not valid");
			}

			String documentUrl = request.getDeviceUrl(); // System.getenv("ONSHAPE_DOCUMENT_URL");; // "https://cad.onshape.com/documents/5b587ad656e9d002f8e6bad6/w/de2c6c2802ab923db649ef32/e/ab629266e0f6758e30a87845";

			Timestamp timestamp = new Timestamp(System.currentTimeMillis());

			client.setAPICredentials(accessKey, secretKey);

			logger.info("Processing request for user[" + request.getUsername() + "], email[" + request.getEmail() + "], device[" + request.getDevice() +"]" );
			// create a copy
			OnshapeDocument bikeAdapter = new OnshapeDocument(documentUrl);
			String newName = request.getDevice() + "Work_" + sdf2.format(timestamp);
			logger.info("Creating a document copy with name:" + newName);

			DocumentsCopyWorkspaceResponse copyWorkspaceResponse = client.documents().copyWorkspace().newName(newName).isPublic(true).call(bikeAdapter);

			String newDocID = copyWorkspaceResponse.getNewDocumentId();

			DocumentsGetDocumentResponse d = client.documents().getDocument().call(newDocID);

			DocumentsGetDocumentResponseDefaultWorkspace w = d.getDefaultWorkspace();
			String newWorkspaceId = w.getId();

			logger.info("Initializing customizer");
			
			DeviceCustomizer customizer = new DeviceCustomizer(client, newDocID, newWorkspaceId);
			logger.info("Loading params");
			customizer.load();

			logger.info("Extracting parameters");
			try {
				for (Object entry : request.getParameters().toArray()) {
					LinkedHashMap<String, Object> p = (LinkedHashMap<String, Object>)entry;
					String name = (String)p.get("onShapeId");
					String param = (String)p.get("onShapeParameter");
					Integer value = null;
					Object ovalue = p.get("value");
					if (ovalue instanceof String) {
						String svalue = (String)ovalue;
						value = Integer.parseInt(svalue);
					} else if (ovalue instanceof Integer) {
						value = (Integer)ovalue;
					}
					Integer defaultValue = (Integer)p.get("defaultValue");
					String unit = (String)p.get("onShapeUnit");
					logger.info("Processing parameter[" + param + "], id[" + name + "], value[" + value + "], default[" + defaultValue + "], unit[" + unit + "]");
					
					if ((name != null) && (param != null) && (value != null) && (unit != null)) {
						logger.info("Setting parameter[" + param + "], id[" + name + "], value[" + value + "], default[" + defaultValue + "], unit[" + unit + "]");
						
						if (value.intValue() == defaultValue.intValue()) {
							logger.info("Parameter set skipped, value = default");
						} else {
							customizer.setParam(name, param, "expression", value.intValue() + " " + unit);
						}	
					}
				};
			} catch (Exception e) {
				logger.error("Error: " + e.getMessage(),e);
				return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
			}
//			customizer.setParam("A_lng_unaff", "lengthValue", "expression", config.arm + " mm");
//			customizer.setParam("B_lng_affect", "lengthValue", "expression", config.affectedarm + " mm");
//			customizer.setParam("F_lng_affect_inner_elbow", "lengthValue", "expression", config.affectedarminner + " mm");
//			customizer.setParam("C_tip_circ", "lengthValue", "expression", config.cone + " mm");
//			customizer.setParam("D_root_circ", "lengthValue", "expression", config.coneb + " mm");
//			customizer.setParam("E_handlebar_dia", "lengthValue", "expression", config.handle + " mm");

			logger.info("Config done, starting STL Export");
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
