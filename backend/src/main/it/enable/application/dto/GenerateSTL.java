package it.enable.application.dto;

import lombok.Data;
import net.minidev.json.JSONArray;

@Data
public class GenerateSTL {
	String username;
	String email;
	String device;
	String deviceUrl;
	JSONArray parameters;
}
