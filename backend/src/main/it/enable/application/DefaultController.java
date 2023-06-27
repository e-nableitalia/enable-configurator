package it.enable.application;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.core.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@CrossOrigin
public class DefaultController {
	
	private static final Logger logger = (Logger) LogManager.getLogger(DefaultController.class);

	
	@Autowired
	private ResourceLoader resourceLoader;
	
	@RequestMapping(value = "/**")
	public ResponseEntity<?> index(HttpServletRequest request) {
		String path = request.getRequestURI();
	    
		Resource resource = resourceLoader.getResource("classpath:" + path);

		logger.info("Returning back document to user");
		return ResponseEntity.ok().body(resource);

	}	
}
