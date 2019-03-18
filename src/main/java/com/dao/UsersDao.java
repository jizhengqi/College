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
	
	// 根据账号查询信息
	public Users queryLog(String uname);
	
	// 修改用户
	public void upd(Users s);
	
	// 删除用户
	public void del(Integer u_id);
	
	// 查询所有用户
	public List<Users> queryAll();
	
	// 分页查询
	public List<Users> queryPage(Integer page,Integer limit);
	
	// 查询所有认证导师的用户
	public List<Users> queryByTeacher(Integer u_teacher);
	
	// 查询所有VIP用户
	public List<Users> queryByVIP(Integer u_vip);
}
