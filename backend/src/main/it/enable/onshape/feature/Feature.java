package it.enable.onshape.feature;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Feature {
	private int type;
	private String typeName;

	FeatureMessage message;
	
	 public void setValue(String parameter, String key, String value) {
 		for (Parameter p : message.getParameters()) {
			if (p.getMessage().getAsString("parameterId").equals(parameter)) {
				p.getMessage().put(key, value);
			}
		}
	 }
}
