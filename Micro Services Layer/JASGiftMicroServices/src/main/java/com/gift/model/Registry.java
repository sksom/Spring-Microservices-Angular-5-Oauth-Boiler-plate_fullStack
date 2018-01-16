package com.gift.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.transaction.Transactional;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "registryId")
public class Registry implements Serializable {

	private static final long serialVersionUID = 99866854751313L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "registry_id", nullable = false, updatable = false)
	private long registryId;

	private String registryName;

	@OneToMany(mappedBy = "registry", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<RegistryItem> registryItemList = new ArrayList<RegistryItem>();

	@OneToOne(cascade = CascadeType.ALL)
	private User user;

	private String shared;

	@ManyToMany
	@JoinTable(name = "registry_shared", joinColumns = { @JoinColumn(name = "fk_registry") }, inverseJoinColumns = {
			@JoinColumn(name = "fk_user") })
	private List<User> sharedUserList = new ArrayList<User>();

	public Registry(long registryId, String registryName, List<RegistryItem> registryItemList, User user,
			String shared) {
		super();
		this.registryId = registryId;
		this.registryItemList = registryItemList;
		this.user = user;
		this.registryName = registryName;
		this.shared = shared;

	}

	public Registry() {
		super();
	}

	public String getRegistryName() {
		return registryName;
	}

	public void setRegistryName(String registryName) {
		this.registryName = registryName;
	}

	public long getRegistryId() {
		return registryId;
	}

	public void setRegistryId(long registryId) {
		this.registryId = registryId;
	}

	public List<RegistryItem> getRegistryItemList() {
		return registryItemList;
	}

	public void setRegistryItemList(List<RegistryItem> registryItemList) {
		this.registryItemList = registryItemList;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Transactional
	public void addItem(Item item) {
		RegistryItem registryItem = new RegistryItem();
		registryItem.setItem(item);
		registryItem.setRegistry(this);
		this.getRegistryItemList().add(registryItem);
	}
	
	@Transactional
	public void addItemAndGiftUser(Item item, User user) {
		RegistryItem registryItem = new RegistryItem();
		registryItem.setItem(item);
		registryItem.setRegistry(this);
		registryItem.setGiftUser(user);
		this.getRegistryItemList().add(registryItem);
	}

	@Transactional
	public void deleteItem(Item item, User user) {
		RegistryItem registryItem = new RegistryItem();
		registryItem.setItem(item);
		registryItem.setRegistry(this);
		if (user != null) {
			registryItem.setGiftUser(user);
		}
		this.getRegistryItemList().remove(registryItem);
	}

	public void removeItem(Item item) {
		this.registryItemList.remove(item);
	}

	public String getShared() {
		return shared;
	}

	public void setShared(String shared) {
		this.shared = shared;
	}

	public List<User> getSharedUserList() {
		return sharedUserList;
	}

	public void setSharedUserList(List<User> sharedUserList) {
		this.sharedUserList = sharedUserList;
	}
}
