package com.Gym.WebGymApplication.repositories;

import com.Gym.WebGymApplication.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    Optional<Chat> findByChatId(String chatId);
    Optional<Chat> findBySenderEmailAndRecipientEmail(String senderEmail, String recipientEmail);
}
