package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Admins;

@Mapper
public interface AdminsDao {
	
	// 注册
	public void logging(Admins a);
	
	// 修改
	public void upd(Admins a);
	
	// 查询所有信息
	public List<Admins> queryAll();
	
}
