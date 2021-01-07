class EventSerializer < ActiveModel::Serializer
  attributes :id, :description, :name, :time, :date,:city_id
  belongs_to :city
  
end
