exports.run = (client, message, args) => {
    const response = args.join(' ');
    message.delete(500);
    message.channel.send(response);
};

exports.help = {
    name: 'say'
};