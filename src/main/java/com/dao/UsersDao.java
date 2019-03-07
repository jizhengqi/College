package com.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.entity.Users;

@Mapper
public interface UsersDao {
	
	// 添加用户
	public void add(Users s);
	
	// 用户登陆
	public List<Users> queryByName(String uname,String pwd);
	
	// 修改用户
	public void upd(Users s);
	
	// 删除用户
	public void del(Integer u_id);
	
	// 查询所有用户
	public List<Users> queryAll();
	
	// 分页查询
	public List<Users> queryPage(Integer page,Integer limit);
}
