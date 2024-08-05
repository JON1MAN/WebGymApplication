package com.Gym.WebGymApplication.repositories;

import com.Gym.WebGymApplication.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {

}
