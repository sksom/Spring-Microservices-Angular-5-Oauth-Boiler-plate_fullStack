package com.gift.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift.exception.ItemNotFoundException;
import com.gift.exception.RegistryNotFoundException;
import com.gift.model.Item;
import com.gift.model.Registry;
import com.gift.model.RegistryItem;
import com.gift.model.User;
import com.gift.repository.RegistryItemRepository;
import com.gift.repository.RegistryRepository;
import com.gift.service.ItemServiceImpl;
import com.gift.service.UserServiceImpl;
import com.gift.util.Response;

@RestController
@CrossOrigin
@RequestMapping("/registry")
public class MicroRegistryController {

	private static final Logger logger = LoggerFactory.getLogger(MicroRegistryController.class);

	@Autowired
	private ItemServiceImpl itemService;

	@Autowired
	private UserServiceImpl userService;

	@Autowired
	private RegistryRepository registryRepository;

	@Autowired
	private RegistryItemRepository registryItemRepository;

	@PostMapping("/create/{registryName}/{userId}")
	public Registry createRegistry(@PathVariable String registryName, @PathVariable Long userId,
			@RequestBody Set<Long> itemIds, HttpServletResponse response) {
		logger.info("Creating the Registry");
		logger.debug("With items " + itemIds);

		Registry registry = new Registry();

		for (Long itemId : itemIds) {
			registry.addItem(itemService.getItemById(itemId));
		}

		User user = userService.getUserById(userId);

		registry.setUser(user);
		registry.setRegistryName(registryName);

		Registry createdRegistry = registryRepository.save(registry);

		/**
		 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
		 */
		response.setStatus(201);
		return createdRegistry;
	}

	@GetMapping
	public Collection<Registry> getAllRegistries() {
		logger.info("Retrieving the Registries");
		return registryRepository.findAll();
	}

	@PostMapping("/add/{registryId}")
	public Registry addItemsToRegistry(@PathVariable Long registryId, @RequestBody Set<Long> itemIds,
			HttpServletResponse response) {
		logger.info("Adding new items to the Registry");
		logger.debug("With item(s) " + itemIds);
		Registry registry = registryRepository.findOne(registryId);
		List<RegistryItem> oldRegistryItems = registry.getRegistryItemList();
		List<Item> oldItems = new ArrayList<Item>();

		for (RegistryItem registryItem : oldRegistryItems) {
			oldItems.add(registryItem.getItem());
		}

		for (Long itemId : itemIds) {
			Item item = itemService.getItemById(itemId);
			logger.info("Inside Item search " + item.getItemId());
			if (!oldItems.contains(item)) {
				logger.info("Inside Item add " + item.getItemId());
				registry.addItem(item);
			}
		}

		logger.info("registry nwo " + registry.getRegistryItemList().toString());

		Registry updatedRegistry = registryRepository.save(registry);

		/**
		 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
		 */
		response.setStatus(201);
		return updatedRegistry;

	}

	@PostMapping("/delete/{registryId}")
	public Registry deleteItemsfromRegistry(@PathVariable Long registryId, @RequestBody Set<Long> itemIds,
			HttpServletResponse response) {
		logger.info("Deleting items from the Registry");
		logger.debug("With item(s) " + itemIds);

		for (Long itemId : itemIds) {
			registryItemRepository.deleteByItemItemIdAndRegistryRegistryId(itemId, registryId);
		}

		/**
		 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
		 */
		response.setStatus(201);
		return registryRepository.findOne(registryId);
	}

	@GetMapping("/id/{id}")
	public Registry getRegistry(@PathVariable long id) {
		logger.info("Retrieving the Registry " + id);
		Registry registry = registryRepository.findOne(id);

		if (registry == null) {
			throw new RegistryNotFoundException();
		}
		return registry;
	}

	@GetMapping("/user/{userId}")
	public Collection<Registry> getRegistryByUserId(@PathVariable long userId) {
		logger.info("Retrieving the Registries for user " + userId);
		Set<Registry> registries = registryRepository.getAllByUserUserId(userId);

		if (registries == null) {
			throw new RegistryNotFoundException();
		}
		return registries;
	}

	@PostMapping("/{registryId}/sharepublic")
	public Registry shareRegistryToPublic(@PathVariable Long registryId, HttpServletResponse response) {
		logger.info("Sharing the registry " + registryId + " to Public");

		Registry reg = registryRepository.findOne(registryId);
		reg.setShared("public");

		Registry updatedRegistry = registryRepository.save(reg);

		/**
		 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
		 */
		response.setStatus(201);
		return updatedRegistry;
	}

	@PostMapping("/{registryId}/sharespecific")
	public Registry shareRegistryToSpecific(@PathVariable Long registryId, @RequestBody Set<Long> userIds,
			HttpServletResponse response) {
		logger.info("Sharing the registry " + registryId + " to specific");

		Registry updatedRegistry = new Registry();

		Registry reg = registryRepository.findOne(registryId);

		List<User> users = new ArrayList<User>();
		for (Long userId : userIds) {

			users.add(userService.getUserById(userId));
		}

		reg.setSharedUserList(users);
		reg.setShared("specific");

		updatedRegistry = registryRepository.save(reg);

		/**
		 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
		 */

		response.setStatus(201);

		return updatedRegistry;
	}

	@GetMapping("/sharedto/{userId}")
	public Collection<Registry> getRegistriesSharedTo(@PathVariable long userId) {
		logger.info("Retrieving the Registries shared for user " + userId);
		Set<Registry> registries = registryRepository.getAllBySharedUserList_UserId(userId);
		Set<Registry> publicRegistries = registryRepository.getAllByShared("public");
		if (registries == null && publicRegistries == null) {
			throw new RegistryNotFoundException();
		}
		registries.addAll(publicRegistries);
		return registries;
	}

	@PostMapping("/{registryId}/{itemId}/{userId}")
	public Response selfAssignItemToUser(@PathVariable long registryId, @PathVariable long itemId,
			@PathVariable long userId, HttpServletResponse response) {
		logger.info("Assigning the Registry Item to the specific user " + userId);

		User user = userService.getUserById(userId);
		List<RegistryItem> list = registryItemRepository.getAllByItemItemIdAndRegistryRegistryId(itemId, registryId);

		if (list.size() == 0) {
			throw new ItemNotFoundException("No matching registries found");
		}

		// matching an item id and registry id,, there can only be one registry
		// Item if present
		RegistryItem registryItem = list.get(0);

		System.out.println(user);

		registryItemRepository.setGiftUser(registryItem.getId(), user);

		return new Response("Self Assigned registry " + registryId + " to, " + userId);

	}

}
