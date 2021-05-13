module CmsHelper
  def get_photo_url(name)
    photo = cms_fragment_render(name, @cms)
    photo.nil? ? '' : photo
  end

  def get_text_content(name, backup)
    content = cms_fragment_render(name, @cms)
    content.empty? ? backup : content
  end
end
