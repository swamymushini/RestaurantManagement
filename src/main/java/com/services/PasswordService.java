package com.services;

import org.springframework.stereotype.Service;
import java.util.Base64;

@Service
public class PasswordService {

	private String originalPassword = "aDhWc3Z3Vz";

	public String decodePassword() {
		byte[] decodedBytes = Base64.getDecoder().decode(originalPassword + "VpeXJK");
		return new String(decodedBytes);
	}

	public String password() {
		return decodePassword();
	}
}
