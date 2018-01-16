package com.gift.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.gift.model.Item;
import com.gift.repository.ItemRepository;

@Service
public class ItemServiceImpl implements IItemService {

	// private static final Logger logger =
	// LoggerFactory.getLogger(ItemServiceImpl.class);

	private static final Logger logger = LoggerFactory.getLogger(ItemServiceImpl.class);

	@Autowired
	private ItemRepository itemRepository;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gift.service.IItemService#getAllItems()
	 */
	@Override
	public List<Item> getAllItems() {
		return itemRepository.findAll();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gift.service.IItemService#getItemById(long)
	 */
	@Override
	// this function is made cacheable
	@Cacheable(value = "usersCache", key = "#id")
	public Item getItemById(long id) {
		logger.info("Retreiving Item from the DB ");

		logger.info("Cache Miss!");

		return itemRepository.findOne(id);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gift.service.IItemService#createItem(com.gift.model.Item)
	 */
	@Override
	public Item createItem(Item item) {
		return itemRepository.save(item);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.gift.service.IItemService#deleteItem(long)
	 */
	@Override
	public void deleteItem(long id) {
		itemRepository.delete(id);
	}

}
