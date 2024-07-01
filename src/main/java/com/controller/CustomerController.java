package com.controller;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Customer;
import com.services.CustomerService;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/customer")
public class CustomerController {

	@Autowired
	CustomerService customerService;

	private static final Logger logger = LoggerFactory.getLogger(CustomerController.class);

	@GetMapping(produces = { "application/json" })
	public List<Customer> getCustomer() {
		List<Customer> customer = customerService.getCustomer();
		logger.info("Customer list {} ", customer);
		return customer;
	}

	@PostMapping("/create")
	public Customer createCustomer(@RequestBody Customer customer) {
		logger.info("create customer is invoked {}", customer);
		return customerService.createCustomer(customer);
	}

	@GetMapping(value = "/{id}", produces = { "application/json" })
	public Customer getCustomerById(@PathVariable("id") int id) {
		logger.info("getMenuById is invoked with menu Id :{}", id);
		return customerService.getCustomerById(id);
	}

	@PutMapping("/update")
	public Customer updateCustomer(@RequestBody Customer customer) {
		return customerService.updateCustomer(customer);
	}

	@DeleteMapping("/{id}")
	public Customer deleteCustomerById(@PathVariable("id") int id) {
		return customerService.deleteCustomerById((id));
	}
}
