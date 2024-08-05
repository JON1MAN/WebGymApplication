package com.Gym.WebGymApplication.services;

import com.Gym.WebGymApplication.models.Chat;
import com.Gym.WebGymApplication.models.Message;
import com.Gym.WebGymApplication.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ChatService {

    @Autowired
    private ChatRepository chatRepository;

    public Optional<String> getChatRoomId(
        String senderEmail,
        String recipientEmail,
        boolean createRoomIfNotExists
    ){
        return chatRepository.findBySenderEmailAndRecipientEmail(senderEmail, recipientEmail)
                .map(Chat::getChatId)
                .or(() -> {
                    if(createRoomIfNotExists){
                        var chatId = createChatId(senderEmail, recipientEmail);
                        Chat chat = new Chat();
                        chat.setChatId(chatId);
                        chat.setSenderEmail(senderEmail);
                        chat.setRecipientEmail(recipientEmail);
                        chatRepository.save(chat);
                        return Optional.of(chatId);
                    }
                    return Optional.empty();
                });
    }

    private String createChatId(String senderEmail, String recipientEmail) {
        return String.format("%s_%s", senderEmail, recipientEmail);
    }


}
