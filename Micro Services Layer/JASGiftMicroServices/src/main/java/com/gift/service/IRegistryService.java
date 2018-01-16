package com.gift.service;

import java.util.List;

import com.gift.model.Registry;
import com.gift.model.RegistryItem;

public interface IRegistryService {

	List<Registry> getAllRegistries();

	Registry getRegistryById(long id);

	Registry createRegistry(Registry registry);

	void deleteRegistryById(long id);

	Registry updateRegistry(Registry registry);
	
	List<RegistryItem> getRegistryItemList(Registry registry);

}