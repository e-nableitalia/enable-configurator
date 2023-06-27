package it.enable.application;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.onshape.api.Onshape;
import com.onshape.api.exceptions.OnshapeException;
import com.onshape.api.requests.PartStudiosUpdateFeatureRequestFeature;
import com.onshape.api.responses.DocumentsGetElementListResponse;
import com.onshape.api.responses.DocumentsGetElementListResponseElements;
import com.onshape.api.responses.PartStudiosGetFeaturesResponse;
import com.onshape.api.responses.PartStudiosUpdateFeatureResponse;
import com.onshape.api.responses.PartsExportStlResponse;
import com.onshape.api.responses.PartsGetPartsResponse;
import com.onshape.api.types.OnshapeDocument;
import com.onshape.api.types.WVM;

import it.enable.onshape.feature.Feature;
import it.enable.onshape.feature.Features;
import lombok.Data;

@Data
public class BikeAdapterCustomizer {
	private Onshape client;
	private String documentID;
	private String workspace;
	private String elementId;
	private boolean valid;
	Features features;

	public BikeAdapterCustomizer(Onshape c, String did, String w) {
		client = c;
		documentID = did;
		workspace = w;
		valid = false;
	}

	public void load() {
		try {
			if (elementId == null) {
				DocumentsGetElementListResponse elist = client.documents().getElementList().call(documentID, WVM.Workspace, workspace);

				DocumentsGetElementListResponseElements elements[] = elist.getElements();

				elementId = elements[0].id;
			}

			OnshapeDocument d = new OnshapeDocument(documentID, workspace, elementId);

			PartStudiosGetFeaturesResponse resp = client.partStudios().getFeatures().call(d);

			ObjectMapper mapper = new ObjectMapper();

			String obj = mapper.writeValueAsString(resp);

			features = mapper.readValue(obj, Features.class);
			valid = true;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			System.out.println("Error:" + e.toString());
		} catch (OnshapeException e) {
			e.printStackTrace();
			System.out.println("Error:" + e.toString());
		}
	}

	public void setParam(String feature, String param, String name, String value) {
		if (!valid)
			return;
		Feature f = features.getByName(feature);

		f.setValue(param, name, value);

		try {
			ObjectMapper mapper = new ObjectMapper();
			String message = mapper.writeValueAsString(f.getMessage());

			Map map = mapper.readValue(message, Map.class);

			PartStudiosUpdateFeatureRequestFeature psufrf = PartStudiosUpdateFeatureRequestFeature.builder()
					.type(Integer.toString(f.getType()))
					.typeName(f.getTypeName())
					.message(map).build();
			client.partStudios().updateFeature()
					.serializationVersion(features.getSerializationVersion())
					.sourceMicroversion(features.getSourceMicroversion())
					.rejectMicroversionSkew(false)
					.feature(psufrf).call(f.getMessage().getFeatureId(), documentID, workspace, elementId);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			System.out.println("Error:" + e.toString());
		} catch (OnshapeException e) {
			e.printStackTrace();
			System.out.println("Error:" + e.toString());
		}
	}

	public String export() {

		try {
			PartsGetPartsResponse parts = client.parts().getParts().call(documentID, WVM.Workspace,workspace);
			PartsExportStlResponse export = client.parts().exportStl()
					.units("millimeter")
					.mode("text")
					.grouping(true)
					.scale(1)
					.call(documentID, WVM.Workspace,workspace, elementId, parts.getParts()[0].getPartId());

			Path temp = Files.createTempFile("hello", ".stl");
			export.getFile().toFile(temp);

			return temp.toString();
		} catch (OnshapeException e) {
			e.printStackTrace();
			System.out.println("Error:" + e.toString());
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Error:" + e.toString());
		}
		return null;
	}
}
