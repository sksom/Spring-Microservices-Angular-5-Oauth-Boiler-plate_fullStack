package com.gift.config;

import java.io.IOException;
import java.util.Base64;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;

public class RestTemplateInterceptor implements ClientHttpRequestInterceptor {

	@Override
	public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution)
			throws IOException {
		String encodedString = Base64.getEncoder().encodeToString("server:secret".getBytes());
		HttpHeaders headers = request.getHeaders();
		headers.add("Authorization", "Basic " + encodedString);
		return execution.execute(request, body);
	}

}
