package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Forbidden extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -4988072047024333117L;
	
	private String message;

	public Forbidden() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Forbidden(String message) {
		super(message);
		this.message = message;
	}

	
}
