package com.gift.service;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.gift.config.CustomRestTemplate;
import com.gift.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	private static final String microServicesURL = "http://localhost:9090/user/";
	private static Logger logger = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		logger.info("In LoadUser");
		CustomRestTemplate customRestTemplate = new CustomRestTemplate();
		User microUser = new User();
		logger.info("In LoadUser next");
		ResponseEntity<String> response;
		try {
			response = customRestTemplate.restTemplate().postForEntity(microServicesURL + "email", email, String.class);
			logger.info("In getUser " + response.getBody());
		} catch (UsernameNotFoundException ex) {
			throw new UsernameNotFoundException("Username" + email + " not found !");
		}

		String user = response.getBody();

		ObjectMapper mapper = new ObjectMapper();

		try {
			JsonNode root = mapper.readTree(user);
			String userId = root.path("userId").toString().replace("\"", "").trim();
			String username = root.path("username").toString().replace("\"", "").trim();
			String password = root.path("password").toString().replace("\"", "").trim();

			microUser.setEmail(email);
			microUser.setUserId(Long.parseLong(userId));
			microUser.setPassword(password);
			microUser.setUsername(username);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return microUser;
	}

}
