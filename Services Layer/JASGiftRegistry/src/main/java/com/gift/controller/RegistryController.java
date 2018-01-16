package com.gift.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift.config.CustomRestTemplate;
import com.gift.exception.ItemNotFoundException;
import com.gift.exception.RegistryNotFoundException;
import com.gift.model.Registry;
import com.gift.model.User;
import com.gift.util.Response;

@RestController
@CrossOrigin
@RequestMapping("/registry")
public class RegistryController {

	private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

	private static final String microServicesURL = "http://localhost:9090/registry/";

	@Autowired
	private CustomRestTemplate customRestTemplate;

	/* Ather - Get user details from Authentication principal */

	@PostMapping("/create/{registryName}")
	public Registry createRegistry(@PathVariable String registryName, @RequestBody Set<Long> itemIds,
			@AuthenticationPrincipal User user) {
		logger.info("Creating the registry with " + itemIds.toArray());
		Registry registry = new Registry();
		try {
			registry = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + "create/" + registryName + "/" + user.getUserId(), itemIds,
							Registry.class)
					.getBody();
			logger.info("In create Registry " + registry.getRegistryId());

		} catch (Exception e) {
			throw new RegistryNotFoundException("Registry creation error !");

		}
		return registry;
	}

	@GetMapping
	public Collection<Registry> getAllRegistries() {
		logger.info("In Retrieving all the Registries");
		Collection<Registry> registry = new HashSet<Registry>();
		try {
			registry = customRestTemplate.restTemplate().exchange(microServicesURL, HttpMethod.GET, null,
					new ParameterizedTypeReference<Collection<Registry>>() {
					}).getBody();
			logger.info("In get all registries ");

		} catch (RegistryNotFoundException e) {
			throw new RegistryNotFoundException("No registries Found !");

		}

		return registry;
	}

	@PostMapping("/add/{registryId}")
	public Registry addItemsToRegistry(@PathVariable Long registryId, @RequestBody Set<Long> itemIds) {
		logger.info("Adding the item(s) to the registry with " + itemIds.toArray());
		Registry registry = new Registry();
		try {
			registry = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + "add/" + registryId, itemIds, Registry.class).getBody();
			logger.info("In add items to Registry " + registry.getRegistryId());

		} catch (Exception e) {
			throw new RegistryNotFoundException("Registry updation error !");

		}
		return registry;
	}

	@PostMapping("/delete/{registryId}")
	public Registry deleteItemsFromRegistry(@PathVariable Long registryId, @RequestBody Set<Long> itemIds) {
		logger.info("Deleting the item(s) from the registry with " + itemIds.toArray());
		Registry registry = new Registry();
		try {
			registry = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + "delete/" + registryId, itemIds, Registry.class).getBody();
			logger.info("In delete items from Registry " + registry.getRegistryId());

		} catch (Exception e) {
			throw new RegistryNotFoundException("Could not delete item(s) from the registry !");

		}
		return registry;
	}

	@GetMapping("/id/{id}")
	public Registry getRegistry(@Valid @PathVariable("id") long id, HttpServletResponse response) {
		logger.info("Retrieving the registry: " + id);
		Registry registry = new Registry();
		try {
			registry = customRestTemplate.restTemplate().getForEntity(microServicesURL + "id/" + id, Registry.class)
					.getBody();
			logger.info("In getRegistry " + registry.getRegistryId());
			response.setStatus(200);
		} catch (Exception e) {
			throw new RegistryNotFoundException("Registry with ID " + id + " not found");
		}
		return registry;
	}

	@GetMapping("/user/{userId}")
	public Collection<Registry> getRegistryByUserId(@PathVariable("userId") long userId, HttpServletResponse response) {
		logger.info("Retrieving the registries for : " + userId);
		Collection<Registry> registries = new ArrayList<Registry>();
		try {
			registries = customRestTemplate.restTemplate().exchange(microServicesURL + "user/" + userId, HttpMethod.GET,
					null, new ParameterizedTypeReference<Collection<Registry>>() {
					}).getBody();
			logger.info("In getRegistries");
			response.setStatus(200);
		} catch (RegistryNotFoundException e) {
			throw new RegistryNotFoundException("Registry for User ID " + userId + " not found");
		}
		return registries;
	}

	@PostMapping("/{registryId}/sharepublic")
	public Registry addItemsToRegistry(@PathVariable Long registryId, HttpServletResponse response) {
		logger.info("Sharing the registry " + registryId + " to Public");

		Registry updatedRegistry = new Registry();

		try {
			updatedRegistry = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + "/" + registryId + "/sharepublic", null, Registry.class)
					.getBody();
			/**
			 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
			 */
			response.setStatus(201);
		}

		catch (Exception e) {
			throw new RegistryNotFoundException("Problem sharing the registry");
		}

		return updatedRegistry;
	}

	@PostMapping("/{registryId}/sharespecific")
	public Registry addItemsToRegistry(@PathVariable Long registryId, @RequestBody Set<Long> userIds,
			HttpServletResponse response) {
		logger.info("Sharing the registry " + registryId + " to specific");

		Registry updatedRegistry = new Registry();

		try {

			updatedRegistry = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + "/" + registryId + "/sharespecific", userIds, Registry.class)
					.getBody();

			/**
			 * Sets the Created HTTP_STATUS when Vehicle is successfully Created
			 */

			response.setStatus(201);

		}

		catch (Exception e) {

			throw new RegistryNotFoundException("Problem sharing the registry");

		}

		return updatedRegistry;
	}

	@GetMapping("/sharedto")
	public Collection<Registry> getRegistriesSharedTo(@AuthenticationPrincipal User user) {
		logger.info("In Retrieving shared Registries " + user.getUserId());
		Collection<Registry> registry = new HashSet<Registry>();
		try {
			registry = customRestTemplate.restTemplate().exchange(microServicesURL + "sharedto/" + user.getUserId(),
					HttpMethod.GET, null, new ParameterizedTypeReference<Collection<Registry>>() {
					}).getBody();
			logger.info("In get all registries by shared to user");

		} catch (Exception e) {
			throw new RegistryNotFoundException("No registries Found !");

		}

		return registry;
	}

	@PostMapping("/{registryId}/{itemId}/{userId}")
	public Registry selfAssignItemToUser(@PathVariable long registryId, @PathVariable long itemId,
			@PathVariable long userId, HttpServletResponse response) {
		Response responseMessage = new Response();
		try {
			responseMessage = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + registryId + "/" + itemId + "/" + userId, null, Response.class)
					.getBody();
			logger.info("In Self Assign " + responseMessage.getMessage());

		} catch (Exception e) {
			throw new ItemNotFoundException("Unable to find item for self assign");
		}

		logger.info("Retrieving the registry: " + registryId);
		Registry registry = new Registry();
		try {
			registry = customRestTemplate.restTemplate()
					.getForEntity(microServicesURL + "id/" + registryId, Registry.class).getBody();
			logger.info("In getRegistry " + registry.getRegistryId());
			response.setStatus(200);
		} catch (Exception e) {
			throw new RegistryNotFoundException("Registry with ID " + registryId + " not found");
		}

		response.setStatus(201);
		return registry;
	}

}
