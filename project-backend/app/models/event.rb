class Event < ApplicationRecord
    belongs_to :city
    accepts_nested_attributes_for :city
end
