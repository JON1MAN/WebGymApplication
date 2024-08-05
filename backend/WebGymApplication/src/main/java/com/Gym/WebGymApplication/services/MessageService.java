package com.Gym.WebGymApplication.services;

import com.Gym.WebGymApplication.models.Message;
import com.Gym.WebGymApplication.repositories.ChatRepository;
import com.Gym.WebGymApplication.repositories.MessageRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class MessageService {

    private MessageRepository messageRepository;
    private ChatService chatService;
    private ChatRepository chatRepository;

   public Message sendMessageToChat(Message message){
       var chatId = chatService.getChatRoomId(
               message.getSenderEmail(),
               message.getRecipientEmail(), 
               false
       );
       chatRepository.findBySenderEmailAndRecipientEmail(
               message.getSenderEmail(),
               message.getRecipientEmail()
       ).orElseThrow().addMessage(message);
       messageRepository.save(message);

       return message;
    }

}
