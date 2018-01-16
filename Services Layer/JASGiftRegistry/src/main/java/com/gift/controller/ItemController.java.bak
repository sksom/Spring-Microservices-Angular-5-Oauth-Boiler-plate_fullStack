package com.gift.controller;

import java.util.Collection;
import java.util.HashSet;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gift.config.CustomRestTemplate;
import com.gift.exception.ItemCreationException;
import com.gift.exception.ItemNotFoundException;
import com.gift.model.Item;
import com.gift.util.Response;

@RestController
@CrossOrigin
@RequestMapping("/item")
public class ItemController {

	private static final Logger logger = LoggerFactory.getLogger(ItemController.class);

	private static final String microServicesURL = "http://localhost:9090/item";

	@Autowired
	private CustomRestTemplate customRestTemplate;

	@GetMapping(value = "/itemList")
	public Collection<Item> getAllItems() {
		logger.info("Retrieving the Items");
		/**
		 * Optional structure to store null without having any exceptions
		 */
		Collection<Item> items = new HashSet<Item>();
		try {
			items = customRestTemplate.restTemplate().exchange(microServicesURL +"/itemList", HttpMethod.GET, null,
					new ParameterizedTypeReference<Collection<Item>>() {
					}).getBody();
			logger.info("In get Items " + items);

		} catch (Exception e) {
			throw new ItemNotFoundException("No Items Found !");

		}

		return items;
	}

	@PostMapping(value = "/add")
	public Item addItemPost(@RequestBody Item item) {
		logger.info("Creating the Item with " + item.toString());
		Item createdItem;
		try {
			createdItem = customRestTemplate.restTemplate()
					.postForEntity(microServicesURL + "/create", item, Item.class).getBody();
			logger.info("In item  " + createdItem.getItemId());

		} catch (Exception e) {
			throw new ItemCreationException("Problem Creating the item !");

		}
		return createdItem;
	}

	@GetMapping("/{id}")
	public Item getBook(@PathVariable("id") Long id) {
		logger.info("Retrieving the item: " + id);

		/**
		 * Optional structure to store null without having any exceptions
		 */
		Item item = new Item();
		try {
			item = customRestTemplate.restTemplate().getForEntity(microServicesURL + "/" + id, Item.class).getBody();
			logger.info("In getItem " + item.getName());

		} catch (Exception e) {
			throw new ItemNotFoundException("Item with ID " + id + " not found");

		}

		return item;
	}

	@PostMapping(value = "/remove")
	public Response remove(@RequestBody String id, HttpServletResponse res) {
		Response response = new Response();
		try {
			response = customRestTemplate.restTemplate().postForEntity(microServicesURL + "/remove", id, Response.class)
					.getBody();
			logger.info("In item removal status code " + response.getMessage());

		} catch (Exception e) {
			throw new ItemNotFoundException("Problem in Item Deletion !");
		}
		res.setStatus(200);
		return response;
	}

}
