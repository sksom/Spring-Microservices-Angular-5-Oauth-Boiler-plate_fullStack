package com.gift.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class RegistryItem implements Serializable {

	private static final long serialVersionUID = 48756234124L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonIgnore
	private long id;

	@ManyToOne
	@JoinColumn(name = "registry_id")
	private Registry registry;

	@ManyToOne
	@JoinColumn(name = "item_id")
	private Item item;

	// @JoinColumn(name = "user_id")

	@Column(name = "gift_user")
	private User giftUser;

	public RegistryItem() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getGiftUser() {
		return giftUser;
	}

	public void setGiftUser(User giftUser) {
		this.giftUser = giftUser;
	}

	public Registry getRegistry() {
		return registry;
	}

	public void setRegistry(Registry registry) {
		this.registry = registry;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

}
