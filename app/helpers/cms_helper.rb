module CmsHelper
  def get_photo_url(name)
    return '' if @cms.nil?

    photo = cms_fragment_render(name, @cms)
    photo.nil? ? '' : photo
  end

  def get_text_content(name, backup)
    return backup if @cms.nil?

    content = cms_fragment_render(name, @cms)
    content.empty? ? backup : content
  end

  def get_article_href(name)
    return 'href=javascript:void(0)' if @cms.nil?

    link = cms_fragment_render(name, @cms)
    link.empty? ? 'href=javascript:void(0)' : "href=#{link} target= _blank"
  end
  
  def get_number(name, backup)
    return backup if @cms.nil?

    number = cms_fragment_render(name, @cms)
    (number.empty? or number.to_i == 0 ) ? backup : number.to_i
  end

end
