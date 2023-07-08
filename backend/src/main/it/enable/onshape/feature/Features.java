package it.enable.onshape.feature;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import net.minidev.json.JSONArray;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Features {
	private boolean isComplete;
	private int rollbackIndex;
	private Feature features[];
	
	private JSONArray imports;
	private JSONArray featureStates;
	private String	serializationVersion;
	private String	sourceMicroversion;
	private boolean	rejectMicroversionSkew;
	private JSONArray defaultFeatures;
	private int libraryVersion;
	private boolean microversionSkew;

    public Feature getByName(String name) {
    	for (Feature f : features) {
    		for (Parameter p : f.getMessage().getParameters()) {
    			if (p.getMessage().getAsString("parameterId").equals("name") 
    					&& p.getMessage().getAsString("value").equals(name))
    				return f;
    		}
    	}
    	return null;
    }
}
