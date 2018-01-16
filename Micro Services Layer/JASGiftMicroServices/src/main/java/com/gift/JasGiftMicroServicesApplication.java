package com.gift;

import javax.transaction.Transactional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.gift.repository.ItemRepository;
import com.gift.repository.RegistryItemRepository;
import com.gift.repository.RegistryRepository;
import com.gift.repository.UserRepository;

@SpringBootApplication
public class JasGiftMicroServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(JasGiftMicroServicesApplication.class, args);
	}

	@Transactional
	@Bean
	public CommandLineRunner setup(RegistryRepository registryRepository, RegistryItemRepository registryItemRepository,
			UserRepository userRepo, ItemRepository i) {
		return (args) -> {
			// List<RegistryItem> list =
			// registryItemRepository.getAllByItemItemIdAndRegistryRegistryId(1L,
			// 1L);
			// RegistryItem newRI = list.get(0);
			// newRI.setGiftUser(userRepo.getOne(1L));
			// registryItemRepository.save(newRI);
			//
			// User user = userRepo.getOne(1L);
			//
			// System.out.println(user);
			//
			// registryItemRepository.setGiftUser(2L, user);

			// System.out.println(registryItemRepository.getOne(1L).getGiftUser());

			// System.out.println("Special case");
			// User user = userRepo.getOne(1L);
			//
			// Registry registry = new Registry();
			//
			// registry.addItemAndGiftUser(i.getOne(1L), user);
			//
			// registry.addItemAndGiftUser(i.getOne(2L), user);
			//
			// registry.setUser(user);
			// registry.setRegistryName("Test user");
			//
			// Registry createdRegistry = registryRepository.save(registry);

			// List<RegistryItem> registryItemList =
			// registry.getRegistryItemList();
			//
			// List<RegistryItem> registryItemListNew = new ArrayList<>();
			//
			// User user = userRepo.getOne(1L);
			//
			// for (RegistryItem registryItem : registryItemList) {
			// if (registryItem.getItem().getItemId() == 1L) {
			// registryItem.setGiftUser(user);
			// registryItemListNew.add(registryItem);
			// } else {
			// registryItemListNew.add(registryItem);
			// }
			// }
			// registry.setRegistryId(30L);
			//
			// registry.setRegistryItemList(registryItemListNew);
			//
			// registryRepository.save(registry);

		};

	}
}
