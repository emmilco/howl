json.articles do
  @articles.map do |article|
    json.set! article.id do
      json.extract! article,
      :id,
      :author_id,
      :title,
      :publish_date,
      :published,
      :lead_text
    end
  end
end

json.manager_articles_index @articles.pluck(:id)
