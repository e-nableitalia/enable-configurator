package it.enable.onshape.feature;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FeatureMessage {
	private String featureType;
	private String featureId;
	private String name;

	private Parameter parameters[];
	
	private boolean suppressed;
	private String namespace;
	private JSONArray subFeatures;
	private JSONArray entities;
	private boolean returnAfterSubfeatures;
	private JSONObject suppressionState;
	private boolean hasUserCode;
	private String nodeId;
}
