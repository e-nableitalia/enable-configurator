package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InternalServerError extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4489563692110005889L;
	
	private String message;

	public InternalServerError() {
		super();
		// TODO Auto-generated constructor stub
	}

	public InternalServerError(String message) {
		super(message);
		this.message=message;
	}
	
}
