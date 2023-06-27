package it.enable.onshape.feature;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;
import net.minidev.json.JSONObject;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Parameter {
	private int type;
	private String typeName;

	JSONObject	message;
}
