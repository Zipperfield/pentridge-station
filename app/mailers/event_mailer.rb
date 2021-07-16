class EventMailer < ApplicationMailer
  def event_request_email
    @event = params[:event]
    @url = 'http://www.pentridgestation.com/admin/events'
    mail(to: 'pentridgestation@gmail.com', subject: 'You Have a New Event Request!')
  end

  def new_message_email
    @message = params[:message]
    @url = 'http://www.pentridgestation.com/admin/messages'
    mail(to: 'pentridgestation@gmail.com', subject: 'You Have a New Message')
  end
end
