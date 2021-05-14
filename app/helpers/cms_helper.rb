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
end
