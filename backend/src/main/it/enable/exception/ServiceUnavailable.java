package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ServiceUnavailable extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5875888803575672159L;
	
	private String message;

	public ServiceUnavailable() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ServiceUnavailable(String message) {
		super(message);
		this.message=message;
	}
	
	
	
	
}
