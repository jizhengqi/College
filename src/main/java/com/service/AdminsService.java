package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.AdminsDao;
import com.entity.Admins;

@Service
@Transactional
public class AdminsService {
	
	@Resource
	AdminsDao ad;
	
	public List<Admins> queryOne(String a_name,String a_pwd){
		return ad.queryOne(a_name, a_pwd);
	}
}
