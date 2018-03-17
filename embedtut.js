message.channel.send({embed: {
  color: 3447003,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  title: "Welcome to the Server!",
  description: "Welcome to this amazing server! Type 'help for questions on anything.",
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
    text: "© Example"
  }
}
});