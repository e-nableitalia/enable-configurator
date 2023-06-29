package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadRequest extends RuntimeException {

	private static final long serialVersionUID = 3547620320529600960L;

	
	private String message;
	
	 public BadRequest() {}
	  
	 public BadRequest(String msg){
		 super(msg);
		 this.message = msg;
	 }
}
