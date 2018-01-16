package com.gift.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gift.model.Registry;

/**
 * The Interface ItemRepository.
 */
@Repository("registryRepository")
public interface RegistryRepository extends JpaRepository<Registry, Long> {

	/**
	 * All methods like findAll, getByID, deleteById etc. will be present in Jpa
	 * which enables our project to be connected to Any Database possible
	 */

	Set<Registry> getAllByUserUserId(Long userId);

	// List<Registry> getAllByusers_sharedto(Long userId);
	Set<Registry> getAllBySharedUserList_UserId(Long userId);

	Set<Registry> getAllByShared(String sharedType);
	

}
