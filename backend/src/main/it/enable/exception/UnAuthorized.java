package it.enable.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnAuthorized extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6818202632350329212L;
	
	private String message;

	public UnAuthorized() {
		super();
	}

	public UnAuthorized(String message) {
		super(message);
		this.message=message;
	}
	
	
}
