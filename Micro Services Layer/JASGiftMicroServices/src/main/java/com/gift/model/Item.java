package com.gift.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Item implements Serializable {
	private static final long serialVersionUID = -278623465123123L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "item_id", nullable = false, updatable = false)
	private long itemId;

	@NotNull(message = "Item name cannot be empty")
	private String name;

	private String category;

	private double price;

	private String imageUrl;

	private String brand;

	private String agegroup;

	@OneToMany(mappedBy = "item")
	@JsonIgnore
	private List<RegistryItem> registryItemList = new ArrayList<RegistryItem>();

	public Item(String name, String category, double price, String imageUrl, String brand, String agegroup) {
		super();
		this.name = name;
		this.category = category;
		this.price = price;
		this.imageUrl = imageUrl;
		this.brand = brand;
		this.agegroup = agegroup;
	}

	public Item() {
		super();
	}

	public String getAgegroup() {
		return agegroup;
	}

	public void setAgegroup(String agegroup) {
		this.agegroup = agegroup;
	}

	public List<RegistryItem> getRegistryItemList() {
		return registryItemList;
	}

	public void setRegistryItemList(List<RegistryItem> registryItemList) {
		this.registryItemList = registryItemList;
	}

	public long getItemId() {
		return itemId;
	}

	public void setItemId(long itemId) {
		this.itemId = itemId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}
