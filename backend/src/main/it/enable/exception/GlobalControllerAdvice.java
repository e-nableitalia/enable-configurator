package it.enable.exception;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;
import javax.validation.ConstraintViolationException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalControllerAdvice {

	private static final Logger logger = (Logger) LogManager.getLogger(GlobalControllerAdvice.class);
	
	@ExceptionHandler(NullPointerException.class) // exception handled
	public ResponseEntity<ErrorResponse> handleNullPointerExceptions(Exception e) {
		HttpStatus status = HttpStatus.NOT_FOUND; // 404
		logger.debug("Error response status: " + status + ", message[" + e.getMessage() + "]");
		return new ResponseEntity<>(new ErrorResponse(status, e.getMessage()), status);
	}

	// fallback method
	@ExceptionHandler(Exception.class) // exception handled
	public ResponseEntity<ErrorResponse> handleExceptions(Exception e) {
		// ... potential custom logic

		HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // 500

		// converting the stack trace to String
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		e.printStackTrace(printWriter);
		String stackTrace = stringWriter.toString();
		logger.debug("Error response status: " + status + ", message[" + e.getMessage() + "]");
		return new ResponseEntity<>(new ErrorResponse(status, e.getMessage(), stackTrace), status);
	}

	@ExceptionHandler(BadRequest.class) // exception handled
	public ResponseEntity<ErrorResponse> handleBadRequestExceptions(Exception e) {
		//Custom Logic

		HttpStatus status = HttpStatus.BAD_REQUEST; // 400

		// converting the stack trace to String
		StringWriter stringWriter = new StringWriter();
		PrintWriter printWriter = new PrintWriter(stringWriter);
		e.printStackTrace(printWriter);
		String stackTrace = stringWriter.toString();
		logger.debug("Error response status: " + status + ", message[" + e.getMessage() + "]");
		return new ResponseEntity<>(new ErrorResponse(status, e.getMessage(), stackTrace), status);
	}

	@ExceptionHandler(ConstraintViolationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ResponseEntity<ErrorResponse> handleConstraintViolationException(Exception e) {
		HttpStatus status = HttpStatus.BAD_REQUEST; // 400
		logger.debug("Error response status: " + status + ", message[" + e.getMessage() + "]");
		return new ResponseEntity<>(new ErrorResponse(status, e.getMessage()),status);
	}

	 /* MessageThreadController.createPost() validation exception are handled here. */
    @ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handmethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException ex) {
		//Custom Logic
		HttpStatus status = HttpStatus.BAD_REQUEST; // 400
		Map<String, String> errors = new HashMap<>();
		
	    ex.getBindingResult().getAllErrors().forEach((error) -> {
	        String fieldName = ((FieldError) error).getField();
	        String errorMessage = error.getDefaultMessage();
	        errors.put(fieldName, errorMessage);
	    });
	    
	    logger.debug("Error response status: " + status + ", message[" + ex.getMessage() + "]");
		return new ResponseEntity<>(new ErrorResponse(status, errors.toString(), null), status);
	}
}
