package com.gift.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gift.model.RegistryItem;
import com.gift.model.User;

/**
 * The Interface ItemRepository.
 */
@Transactional
@Repository("registryItemRepository")
public interface RegistryItemRepository extends JpaRepository<RegistryItem, Long> {

	/**
	 * All methods like findAll, getByID, deleteById etc. will be present in Jpa
	 * which enables our project to be connected to Any Database possible
	 * 
	 * @return
	 */
	@Transactional
	void deleteByItemItemIdAndRegistryRegistryId(Long itemId, Long registryId);

	@Transactional
	List<RegistryItem> getAllByItemItemIdAndRegistryRegistryId(Long itemId, Long registryId);

	@Modifying
	@Query("update RegistryItem r set r.giftUser= ?2 where r.id = ?1")
	int setGiftUser(Long RegistryItemId, User user);
}
