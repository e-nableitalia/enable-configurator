package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestTimeout extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4918843609958144440L;
	
	private String message;

	public RequestTimeout() {
		super();
		// TODO Auto-generated constructor stub
	}

	public RequestTimeout(String message) {
		super(message);
		this.message=message;
	}
	
	
}
