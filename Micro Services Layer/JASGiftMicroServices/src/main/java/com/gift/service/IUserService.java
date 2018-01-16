package com.gift.service;

import java.util.List;

import com.gift.model.User;

public interface IUserService {


	User getUserById(long id);

	User getUserByEmail(String email);

	User updateUser(User user);
	
	List<User> getAllUsers();

	User createUser(User user);

}
