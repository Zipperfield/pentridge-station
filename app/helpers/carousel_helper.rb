module CarouselHelper
  def get_next_slide(num, limit)
    (num + 1) > limit ? 1 : num + 1
  end

  def get_prev_slide(num, limit)
    !(num - 1).positive? ? limit : num - 1
  end

  def get_english_word(num)
    case num
    when 1
      'One'
    when 2
      'Two'
    when 3
      'Three'
    when 4
      'Four'
    when 5
      'Five'
    end
  end
end
