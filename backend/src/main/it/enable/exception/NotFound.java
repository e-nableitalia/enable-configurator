package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotFound extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3451530931956556115L;
	
	private String message;

	public NotFound() {
		super();
		// TODO Auto-generated constructor stub
	}

	public NotFound(String message) {
		super(message);
		this.message=message;
	}
	
	
}
