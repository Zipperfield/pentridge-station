module CmsHelper
  def get_photo_url(name)
    photo = cms_fragment_render(name, @cms)
    photo.nil? ? '' : photo
  end
end
