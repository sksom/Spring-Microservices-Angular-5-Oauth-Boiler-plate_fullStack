package com.gift.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ItemCreationException extends RuntimeException {

	private static final long serialVersionUID = 1676L;
	
	public ItemCreationException() {
		super("Problem Creating the item");
	}
	
	public ItemCreationException(String message) {
		super(message);
	}

}
