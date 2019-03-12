package com.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dao.LanguageDao;
import com.entity.Language;

@Service
@Transactional
public class LanguageService {

	@Resource
	LanguageDao ld;
	
	public void add(Language l){
		ld.add(l);
	}
	
	public void upd(Language l){
		ld.upd(l);
	}

	public void del(Integer l_id){
		ld.del(l_id);
	}
	
	public List<Language> queryAll(){
		return ld.queryAll();
	}
	
	public void queryPage(){
		
	}
}
